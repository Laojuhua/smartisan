import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state: {
        carPanelData: [],
        receiveInfo:[
            {
                "name": "王XX",
                "phone": "13811111111",
                "areaCode": "010",
                "landLine": "64627856",
                "provinceId": 110000,
                "province": "北京市",
                "cityId": 110100,
                "city": "市辖区",
                "countyId": 110106,
                "county": "海淀区",
                "add": "上地十街辉煌国际西6号楼319室",
                "default": false
            },
            {
                "name": "李小X",
                "phone": "13822222212",
                "areaCode": "010",
                "landLine": "64627856",
                "provinceId": 110000,
                "province": "北京市",
                "cityId": 110100,
                "city": "市辖区",
                "countyId": 110106,
                "county": "海淀区",
                "add": "上地十街辉煌国际东6号楼350室",
                "default": true
            }
        ],
        maxOff: false,
        carShow: false,
        carTimer: null,
        ball: {
            show: false,
            el: null,
            img: ''
        }
    },
    getters: {
        totleCount(state) {
            let count = 0;
            state.carPanelData.forEach((goods) => {
                count += goods.count
            })
            return count
        },
        totleprice(state) {
            let price = 0;
            state.carPanelData.forEach((goods) => {
                price += goods.price * goods.count
            })
            return price
        },
        allChecked(state){
            let allChecked = true;
            state.carPanelData.forEach((goods)=>{
                if(!goods.checked){
                    allChecked = false;
                    return
                }
            })
            return allChecked
        },
        checkedCount(state){
            let count = 0;
            state.carPanelData.forEach((goods)=>{
                if(goods.checked){
                    count += goods.count
                }
            })
            return count
        },
        checkedPrice(state){
            let price = 0;
            state.carPanelData.forEach((goods)=>{
                if(goods.checked){
                    price += goods.count * goods.price
                }
            })
            return price
        },
        checkedGoods(state){
            let checkedGoodsList = [];
            state.carPanelData.forEach((goods)=>{
                if(goods.checked){
                    checkedGoodsList.push (goods)
                }
            })  
            return checkedGoodsList  
        }
    },
    mutations: {
        addCarPanelData(state, data) {
            let bOff = true
            if (!state.ball.show) {
                state.carPanelData.forEach((goods) => {
                    if (goods.sku_id === data.info.sku_id) {
                        goods.count += data.count
                        bOff = false
                            //goods.count > goods.limit_num ? goods.count = goods.limit_num : goods.count;
                        if (goods.count > goods.limit_num) {
                            goods.count -= data.count;
                            state.maxOff = true
                            return
                        }
                        state.carShow = true
                        state.ball.show = true
                        state.ball.img = data.info.ali_image
                        state.ball.el = event.path[0]
                    }
                })
                if (bOff) {
                    let goodsData = data.info
                    Vue.set(goodsData, 'count', data.count)
                    Vue.set(goodsData,'checked',true)
                    state.carPanelData.push(goodsData)
                    state.carShow = true
                    state.ball.show = true
                    state.ball.img = data.info.ali_image
                    state.ball.el = event.path[0]
                }
                //console.log(state.carPanelData)
            }
        },
        delCarPanelData(state, id) {
            state.carPanelData.forEach((goods, index) => {
                if (goods.sku_id === id) {
                    state.carPanelData.splice(index, 1)
                    return
                }
            })
        },
        plusCarPanelData(state, id){
            state.carPanelData.forEach((goods, index) => {
                if (goods.sku_id === id) {
                    if(goods.count>=goods.limit_num) return
                    goods.count++
                    return
                }
            }) 
        },
        subCarPanelData(state, id){
            state.carPanelData.forEach((goods,index) => {
                if(goods.sku_id === id){
                    if(goods.count<=1) return
                    goods.count--
                    return
                }
            })
        },
        checkGoods(state,id){
            state.carPanelData.forEach((goods,index)=>{
                if(goods.sku_id === id){
                    goods.checked = !goods.checked
                }
            })
        },
        allCheckGoods(state,allChecked){
            state.carPanelData.forEach((goods,index)=>{
                goods.checked = !allChecked
            })
        },
        delCheckedGoods(state){ //正序删除会将第二个顶上，错过这个导致删除出错，改用倒序删除Ok
            let i = state.carPanelData.length;
            while (i--) {
                if(state.carPanelData[i].checked){
                    state.carPanelData.splice(i,1)
                }
                
            }
            // state.carPanelData.forEach((goods,index)=>{
            //     if(goods.checked){
            //         state.carPanelData.splice(index,1)
            //     }
            // })
        },
        closePrompt(state) {
            state.maxOff = false
        },
        showcar(state) {
            //clearTimeout(state.carTimer)
            clearTimeout(state.carTimer)
            state.carShow = true
        },
        hidecar(state) {
            state.carTimer = setTimeout(() => {
                state.carShow = false
            }, 500)

        }
    }
})

export default store