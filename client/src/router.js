import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
            {
                  path: "/insubuy",
                  name: "insubuy",
                  component: () => import("./views/Insubuy.vue")
            },
            {
                  path: "/quotes-page",
                  name: "quotes-page",
                  component: () => import("./views/QuotesPage.vue")
            }
	]
});
