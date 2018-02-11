<template>
    <div id="prompt" v-if="maxOff">
        <div class="module-dialog-layer" style="display: block;"></div>
        <div class="clear module-dialog module-dialog-confirm module-dialog-show" style="display: block; opacity: 1;">
            <div class="dialog-panel">
            <div class="topbar">
                <div class="dialog-tit clear">
                <h4 class="js-dialog-title">提示</h4>
                </div>
                <span class="dialog-close png" @click="hidePrompt()"></span>
            </div>
            <div class="dialog-con js-dialog-container">
                <div class="confirm-msg">商品已达到最大可购买数量，无法继续添加</div>
            </div>
            <div class="dialog-btn-wrap clear">
                <div class="blue-main-btn normal-main-btn js-dialog-done" @click="hidePrompt()">
                <a>确定</a>
                </div>
            </div>
            </div>
        </div>
    </div> 
</template>
<script>
    import '@/assets/css/prompt'
    export default {
       computed:{
           maxOff(){
               return this.$store.state.maxOff
           }
       },
       methods: {
           hidePrompt(){
               this.$store.commit('closePrompt')
           }
       } 
    }
</script>
<style>

</style>

