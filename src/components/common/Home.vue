<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>

    </div>
</template>

<script>

    import { mapState, mapMutations } from "vuex";

    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from './bus';
    import router from '@/router';
    export default {
        data() {
            return {
                tagsList: [],
                collapse: false,
                ...mapState,
            };
        },
        components: {
            vHead,
            vSidebar,
            vTags
        },
        created() {
            bus.$on('collapse-content', msg => {
                this.collapse = msg;
            });

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                for (let i = 0, len = msg.length; i < len; i++) {
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            });
            this.init();
        },
        methods: {
            async init() {
              
                    let data = {
                        name: " 杨建忠",
                        items: [{
                            icon: 'el-icon-lx-home',
                            index: 'dashboard',
                            title: '系统首页'
                        },
                        {
                            icon: 'el-icon-lx-cascades',
                            index: 'table',
                            title: '基础表格'
                        },
                        // {
                        //     icon: 'el-icon-lx-copy',
                        //     index: 'tabs',
                        //     title: 'tab选项卡'
                        // },
                        {
                            icon: 'el-icon-lx-calendar',
                            index: '3',
                            title: '表单相关',
                            subs: [{
                                index: 'form',
                                title: '基本表单'
                            },
                            {
                                index: '3-2',
                                title: '三级菜单',
                                subs: [{
                                    index: 'editor',
                                    title: '富文本编辑器'
                                },
                                {
                                    index: 'markdown',
                                    title: 'markdown编辑器'
                                }
                                ]
                            },
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                            ]
                        },
                        {
                            icon: 'el-icon-lx-emoji',
                            index: 'icon',
                            title: '自定义图标'
                        },
                        {
                            icon: 'el-icon-pie-chart',
                            index: 'charts',
                            title: 'schart图表'
                        },
                        {
                            icon: 'el-icon-rank',
                            index: '6',
                            title: '拖拽组件',
                            subs: [{
                                index: 'drag',
                                title: '拖拽列表'
                            },
                            {
                                index: 'dialog',
                                title: '拖拽弹框'
                            }
                            ]
                        },
                        {
                            icon: 'el-icon-lx-global',
                            index: 'i18n',
                            title: '国际化功能'
                        },
                        {
                            icon: 'el-icon-lx-warn',
                            index: '7',
                            title: '错误处理',
                            subs: [{
                                index: 'permission',
                                title: '权限测试'
                            },
                            {
                                index: '404',
                                title: '404页面'
                            }
                            ]
                        },
                        ]

                    }
                    let menuArr = [];

                    ; (function getMenuArr(Arr) {
                        if (Arr.length) {
                            Arr.forEach(item => {
                                if (item.subs && item.subs.length > 0) {
                                    getMenuArr(item.subs)
                                }

                                else { menuArr.push(item.index) }

                            })

                        }
                    })(data.items)
                    console.log(menuArr);
                    this.updateMainInfo(data);

                    router.beforeEach((to, from, next) => {
                       
                        console.log(to.path)
                        if (to.path == "/403" || to.path == "/404"||to.path=="/login") {
                           
                            next();
                        }
                        else if(!menuArr.includes(to.path.substr(1))){
                           
                            next("/403")

                        }
            
                        else {
                            console.log(3)
                            next();
                           
                        }


                    });


            },
            ...mapMutations(["updateMainInfo"])
        }
    };

</script>