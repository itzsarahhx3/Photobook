import { Auth } from "aws-amplify";

export const auth = {
    // authorize to access in store
    namespaced: true,
    state: { user: null },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    // actions handle async action
    actions: {
        // destructure commit -> think about dispatch {data}
        async logout({ commit }) {
            // always commit user
            commit("setUser", null);
            return await Auth.signOut();
        },
        // 2nd argument is always the payload to commit
        async login({ commit }, { username, password }) {
            try {
                await Auth.signIn({
                    username,
                    password
                });

                const userInfo = await Auth.currentUserInfo();
                // if a user successfully logged in, update the state with the user info
                commit("setUser", userInfo);
                // "then" method
                return Promise.resolve("Success");
            } catch (error) {
                console.log(error);
                // next(error)
                return Promise.reject(error);
            }
        },
        // not doing any action, so _
        async confirmSignUp(_, { username, code }) {
            try {
                await Auth.confirmSignUp(username, code);
                return Promise.resolve();
            } catch (error) {
                console.log(error);
                return Promise.reject(error);
            }
        },

        async signUp(_, { username, password, email }) {
            try {
                await Auth.signUp({
                    username,
                    password,
                    attributes: {
                        email
                    }
                });
                return Promise.resolve();
            } catch (error) {
                console.log(error);
                return Promise.reject();
            }
        },

        async authAction({ commit }) {
            const userInfo = await Auth.currentUserInfo();
            commit("setUser", userInfo);
        }
    },
    // return the state like reducer
    getters: {
        user: state => state.user
    }
};
