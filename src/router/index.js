import Vue from 'vue'
import Router from 'vue-router'
//前台首页
import Home from '@/pages/index/Home'
import Search from '@/pages/index/Search' //前台搜索页
import Rank from '@/pages/index/Rank' //前台排行榜页
//登录页
import Login from '@/pages/admin/Login'
//后台首页
import Administrators from '@/pages/administrators/Administrators'
//--系统管理员后台--
import System_Administrators from '@/pages/system_administrators/System_Administrators'
 //工作台
import Workbench from '@/base/workbench/Workbench'
//站点管理
import AddSite from '@/base/site_management/AddSite' //添加站点
import SiteList from '@/base/site_management/SiteList' //站点列表
import EditSite from '@/base/site_management/EditSite' //编辑站点
import ContentManagement from '@/base/site_management/ContentManagement' //内容管理
import EditContent from '@/base/site_management/EditArticle' //编辑内容
import ContentRecycleBin from '@/base/site_management/ArticleRecycleBin' //内容回收站
import DataBackup from '@/base/site_management/DataBackup' //数据备份

//附件管理
import AddEnclosure from '@/base/enclosure_management/AddEnclosure' //添加附件
import EnclosureList from '@/base/enclosure_management/EnclosureList' //附件列表
//组件管理
import AddComponent from '@/base/component_management/AddComponent' //添加组件
import ComponentList from '@/base/component_management/ComponentList' //组件列表
//网站模板
import AddTemplate from '@/base/site_template/AddTemplate' //添加模板
import TemplateList from '@/base/site_template/TemplateList' //模板列表
//权限管理
import AddUser from '@/base/authority_management/AddUser' //添加用户
import UserList from '@/base/authority_management/UserList' //用户列表
import EditUser from '@/base/authority_management/EditUser' //编辑用户
import AddUserGroup from '@/base/authority_management/AddUserGroup' //添加用户组
import UserGroupList from '@/base/authority_management/UserGroupList' //用户组列表
import EditUserGroup from '@/base/authority_management/EditUserGroup' //编辑用户组
//系统设置
import DepartmentList from '@/base/system_setup/DepartmentList' //部门列表
import LoginLog from '@/base/system_setup/LoginLog' //登陆日志
import SiteInfo from '@/base/system_setup/SiteInfo' //站点信息
import SecuritySetting from '@/base/system_setup/SecuritySetting' //安全设置
import EnclosureSetting from '@/base/system_setup/EnclosureSetting' //附件设置
import MailSetting from '@/base/system_setup/MailSetting' //邮件设置
import LoginPageSetting from '@/base/system_setup/LoginPageSetting' //后台登录页设置
import AutomationSetting from '@/base/system_setup/AutomationSetting' //自动化设置
//系统欢迎页
import welcome from '@/pages/Systemsettings/welcome'//系统设置欢迎页
Vue.use(Router)

//--非系统管理员后台--
import Editor from '@/pages/editor/editor'
//写文章
import PublishArticle from '@/edit/publish_article/PublishArticle'
//文章列表
import ArticleList from '@/edit/article_list/ArticleList'
//文章编辑
import EditArticle from '@/edit/article_list/EditArticle'
//文章回收站
import ArticleRecycleBin from '@/edit/article_list/ArticleRecycleBin'
//菜单列表
import ColumnList2 from '@/edit/column_list/ColumnList'

//分类操作
import CategoryList from '@/edit/category/CategoryList'//分类列表
import AddCategory from '@/edit/category/AddCategory'//添加分类
import EditCategory from '@/edit/category/EditCategory'//编辑分类
//编辑菜单
import EditColumn2 from '@/edit/column_list/EditColumn'
//轮播图管理
import CarouselList from '@/edit/carousel_list/CarouselList'//轮播图列表
import AddCarousel from '@/edit/carousel_list/AddCarousel'//添加轮播图
//待审文章
import PendingArticle from '@/edit/pending_article/PendingArticle'
//广告管理
import AdvertisementList from '@/edit/advertisement_list/AdvertisementList'//广告列表
import AddAdvertisement from '@/edit/advertisement_list/AddAdvertise'//添加广告
//活动预告
import ActivityPreview from '@/edit/activity_preview/ActivityPreview'//活动列表
import AddActivity from '@/edit/activity_preview/AddActivity'//添加活动
//教师风采
import TeachersList from '@/edit/teachers_list/TeachersList'
//数据看板
import DataBoard from '@/edit/data_board/DataBoard'
//文章排行
import ArticleRank from '@/edit/article_rank/ArticleRank'
//站点信息
import SiteInformation from '@/edit/site_information/SiteInformation'
//站点访问排行
import AccessRank from '@/edit/access_rank/AccessRank'
//站点文章数量排行
import CountRank from '@/edit/count_rank/CountRank'
//回收站
import RecycleBin from '@/edit/recycle_bin/RecycleBin'
//单页列表
import SinglepageList from '@/edit/singlepage_list/SinglepageList'
//添加单页
import AddSinglepage from '@/edit/singlepage_list/AddSinglepage'
//编辑单页
import EditSinglepage from '@/edit/singlepage_list/EditSinglepage'
//网页生成
import PageGeneration from '@/edit/page_generation/PageGeneration'
//网页模板
import PageTemplate from '@/edit/page_template/PageTemplate'
//添加模板
import AddTemplate2 from '@/edit/page_template/AddTemplate'
//编辑模板
import EditTemplate2 from '@/edit/page_template/EditTemplate'
//更新模板
import UpdateTemplate2 from '@/edit/page_template/UpdateTemplate'
//附件管理
import Enclosure from '@/edit/enclosure_management/EnclosureList'
//添加附件
import AddEnclosure2 from '@/edit/enclosure_management/AddEnclosure'
//友情链接
import FriendlyLink from '@/edit/friendly_link/FriendlyLink'//友情链接列表
import AddFriendlyLink from '@/edit/friendly_link/AddFriendlyLink'//添加友情链接
//文章标签管理
import TagList from '@/edit/tag/TagList'



export default new Router({
    routes: [{
            path: '/',
            component: Home           
        },
        {
            path: '/pages/index/Home',
            component: Home
        },
        {
            path: '/pages/index/Search',
            component: Search
        },
        {
            path: '/pages/index/Rank',
            component: Rank
        },
        {
            path: '/pages/admin/Login',
            component: Login
        },
        {
            path: '/pages/system_administrators/System_Administrators',
            component: System_Administrators,
            children: [{
                    path: '/',
                    component: Workbench
                },
                {
                    path: 'Workbench',
                    component: Workbench
                },
                {
                    path: 'AddSite',
                    component: AddSite
                },
                {
                    path: 'SiteList',
                    component: SiteList
                },
                {
                    path: 'EditSite',
                    component: EditSite
                },
                {
                    path: 'ContentManagement',
                    component: ContentManagement
                },
                {
                    path: 'EditContent',
                    component: EditContent
                },
                {
                    path: 'ContentRecycleBin',
                    component: ContentRecycleBin
                },
                {
                    path: 'DataBackup',
                    component: DataBackup
                },
                {
                    path: 'AddEnclosure',
                    component: AddEnclosure
                },
                {
                    path: 'EnclosureList',
                    component: EnclosureList
                },
                {
                    path: 'AddComponent',
                    component: AddComponent
                },
                {
                    path: 'ComponentList',
                    component: ComponentList
                },
                {
                    path: 'AddTemplate',
                    component: AddTemplate
                },
                {
                    path: 'TemplateList',
                    component: TemplateList
                },
                {
                    path: 'AddUser',
                    component: AddUser
                },
                {
                    path: 'UserList',
                    component: UserList
                },
                {
                    path: 'EditUser',
                    component: EditUser
                },
                {
                    path: 'AddUserGroup',
                    component: AddUserGroup
                },
                {
                    path: 'UserGroupList',
                    component: UserGroupList
                },
                {
                    path: 'EditUserGroup',
                    component: EditUserGroup
                },
                {
                    path: 'DepartmentList',
                    component: DepartmentList
                },
                {
                    path: 'SiteInfo',
                    component: SiteInfo
                },
                {
                    path: 'SecuritySetting',
                    component: SecuritySetting
                },
                {
                    path: 'EnclosureSetting',
                    component: EnclosureSetting
                },
                {
                    path: 'MailSetting',
                    component: MailSetting
                },
                {
                    path: 'LoginPageSetting',
                    component: LoginPageSetting
                },
                {
                    path: 'AutomationSetting',
                    component: AutomationSetting
                },
                {
                    path: 'LoginLog',
                    component: LoginLog
                },
            ]
        },
        {
            path: '/pages/Systemsettings/welcome',
            component: welcome
        },
        {
            path: '/pages/administrators/Administrators',
            component: Administrators
        },
        //非系统管理员
        {
            path:'/pages/editor/editor',
            component:Editor,
            children:[
                {
                path: 'publish_article',
                component: PublishArticle
            },
                {
                path: 'article_list',
                component: ArticleList
            },
                {
                path: 'edit_article',
                component: EditArticle
            },
                {
                path: 'article_recycle_bin',
                component: ArticleRecycleBin
            },
                {
                path: 'column_list',
                component: ColumnList2
            },
                {
                path: 'category_list',
                component: CategoryList
            },
                {
                path: 'add_category',
                component: AddCategory
            },
                {
                path: 'edit_category',
                component: EditCategory
            },
                {
                path: 'edit_column',
                component: EditColumn2
            },
                {
                path: 'carousel_list',
                component: CarouselList
            },
                {
                path: 'add_carousel',
                component: AddCarousel
            },
                {
                path: 'pending_article',
                component: PendingArticle
            },
                {
                path: 'advertisement_list',
                component: AdvertisementList
            },
                {
                path: 'add_advertisement',
                component: AddAdvertisement
            },
                {
                path: 'activity_preview',
                component: ActivityPreview
            },
                {
                path: 'add_activity',
                component: AddActivity
            },
                {
                path: 'teachers_list',
                component: TeachersList
            },
                {
                path: 'data_board',
                component: DataBoard
            },
                {
                path: 'article_rank',
                component: ArticleRank
            },
                {
                path: 'site_information',
                component: SiteInformation
            },
                {
                path: 'access_rank',
                component: AccessRank
            },
                {
                path: 'count_rank',
                component: CountRank
            },
                {
                path: 'recycle_bin',
                component: RecycleBin
            },
                {
                path: 'singlepage_list',
                component: SinglepageList
            },
                {
                path: 'add_singlepage',
                component: AddSinglepage
            },
                {
                path: 'edit_singlepage',
                component: EditSinglepage
            },
                {
                path: 'page_generation',
                component: PageGeneration
            },
                {
                path: 'page_template',
                component: PageTemplate
            },
                {
                path: 'add_template',
                component: AddTemplate2
            },
                {
                path: 'edit_template',
                component: EditTemplate2
            },
                {
                path: 'update_template',
                component: UpdateTemplate2
            },
                {
                path: 'enclosure_management',
                component: Enclosure
            },
                {
                path: 'add_enclosure',
                component: AddEnclosure2
            },
                {
                path: 'friendly_link',
                component: FriendlyLink
            },
                {
                path: 'add_friendly_link',
                component: AddFriendlyLink
            },
                {
                path: 'tag_list',
                component: TagList
            },
        
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
