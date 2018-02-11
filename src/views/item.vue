<template>
    <div id="main">
        <div class="store-content item">
            <div class="item-box">
                <div class="gallery-wrapper">
                    <div class="gallery">
                        <div class="thumbnail">
                            <ul>
                                <li :class="{'on':index==imgIndex}" @click="imgTable(index)" v-for="(item,index) in itemInfo.ali_images" :key="index">
                                    <img :src="item+'?x-oss-process=image/resize,w_54/quality,Q_90/format,webp'">
                                </li>
                            </ul>
                        </div>
                        <div class="thumb">
                            <ul>
                                <li :class="{'on':index==imgIndex}" v-for="(item,index) in itemInfo.ali_images" :key="index">
                                    <img :src="item+'?x-oss-process=image/resize,w_440/quality,Q_90/format,webp'">
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="banner">
                    <div class="sku-custom-title">
                        <div class="params-price">
                            <span><em>¥</em><i>{{itemInfo.price}}</i></span>
                        </div>
                        <div class="params-info">
                            <h4>{{itemInfo.title}}</h4>
                            <h6>{{itemInfo.sub_title}}</h6>
                        </div>
                    </div>
                    <div class="sku-dynamic-params-panel">
                        <div class="sku-dynamic-params clear">
                            <span class="params-name">颜色</span>
                            <ul class="params-colors">
                                <li :class="{'cur':item.id==$route.query.itemId}" v-for="(item,index) in itemInfo.sku_list" :key="index">
                                    <router-link :to="{name:'Item',query:{itemId:item.id}}" :title="item.color">
                                        <i><img :src="'http://img01.smartisanos.cn/'+item.image+'20X20.jpg'"></i>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="sku-dynamic-params clear">
                            <div class="params-name">数量</div>
                            <div class="params-detail clear">
                                <div class="item-num js-select-quantity">
                                    <span class="down" :class="{'down-disabled':count<=1}" @click="subCount">-</span>
                                    <span class="num">{{count}}</span>
                                    <span class="up" :class="{'up-disabled':count>=itemInfo.limit_num}" @click="addCount">+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="sku-status">
                        <div class="cart-operation-wrapper clearfix">
                            <span class="blue-title-btn js-add-cart" @click="carPanelHandle"><a>加入购物车</a></span>
                            <span class="gray-title-btn"><a>现在购买</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <prompt></prompt>
    </div>
</template>
<script>
    import '@/assets/css/item'
    import prompt from '@/components/prompt'
    import itemsData from '@/lib/newItemsData'
    export default {
        data () {
            return {
                itemsData,
                itemId:this.$route.query.itemId,
                imgIndex:0,
                count:1
            }
        },
        watch:{
            '$route.query.itemId'(){
                this.itemId = this.$route.query.itemId
                this.imgIndex = 0
            }
        },
        computed:{

            itemInfo(){
                let itemInfo = this.itemsData.filter((item)=>{
                    //console.log(item)
                    return Number(item.sku_id)===Number(this.itemId)
                })[0]
                return itemInfo
            }

        },
        components: {
            prompt
        },
        methods:{
            carPanelHandle(){
                let itemData = {
                    info:this.itemInfo,
                    count:this.count
                }
                this.$store.commit("addCarPanelData",itemData)
            },
            imgTable(index){
                this.imgIndex = index
            },
            addCount(){
                //return this.$data.count++
                this.count++
                if(this.count > this.itemInfo.limit_num){
                    this.count = this.itemInfo.limit_num
                }
            },
            subCount(){
                this.count--
                if(this.count == 0){
                    this.count = 1;
                }
            }
        }
    }
</script>
<style>

</style>

