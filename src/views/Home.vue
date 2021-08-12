<template>
    <div class="home">
        <!-- <amplify-authenticator> </amplify-authenticator>
        <div>
            <amplify-sign-out></amplify-sign-out>
            <div>Hello Hey</div>
        </div> -->
        <Login />
    </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";

export default {
    name: "Home",
    components: {
        Login
    }
};
</script>
