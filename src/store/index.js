import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        reception_search_keyword: '', //关键字
        reception_search_option: 0, //全局/标题
        reception_search_source: true, //切换搜索‘站群’和‘共享平台’
        system_menu_idx: 0 ,//系统管理员侧边菜单定位
    },
    mutations: {
        update_reception_search_keyword(state, reception_search_keyword) {
            state.reception_search_keyword = reception_search_keyword;
        },
        update_reception_search_option(state, reception_search_option) {
            state.reception_search_option = reception_search_option;
        },
        update_reception_search_source(state, reception_search_source) {
            state.reception_search_source = reception_search_source;
        },
        update_system_menu_idx(state, menu_idx) {
            state.system_menu_idx = menu_idx;
        },
    }
})
