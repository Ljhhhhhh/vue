var vm = new Vue({
    el: "#app",
    data: {
        totalMoney: 0,
        totalPrice:0,
        productList: [],
        checkAllFlag: false,
        delFlag:false,
        curProduct:''
    },
    filters: {
        formatMoney: function (value) {
            return "￥" + value.toFixed(2);
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.cartView();
        })
    },
    methods: {
        cartView: function () {
            var _this = this;
            $.ajax({
                url: "data/cartData.json",
                type: "POST",
                dataType: "json",
                success: function (e) {
                    _this.productList = e.result.list;
                    _this.totalMoney = e.result.totalMoney;
                },
                error: function () {
                    alert('ajax获取失败');
                }
            })
        },
        changeMoney: function (item, con) {
            if (item.productQuantity == 0 && con == -1)return
            item.productQuantity += con;
            this.calcTotalPrice();
        },
        selectedProduct: function (item) {
            if (typeof item.checked == 'undefined') {
                Vue.set(item, "checked", true);
            } else {
                item.checked = !item.checked;
                if (item.checked == false) {
                    this.checkAllFlag = false;
                }
                ;
            }
            this.calcTotalPrice();
        },
        checkAll: function () {
            this.checkAllFlag = !this.checkAllFlag;
            var _this = this;
            this.productList.forEach(function (item, index) {
                if (typeof item.checked == 'undefined') {
                    Vue.set(item, "checked", true);
                } else {
                    item.checked = _this.checkAllFlag;
                }
            })
            this.calcTotalPrice();
        },
        calcTotalPrice: function () {
            var _this=this;
            _this.totalPrice=0;
            this.productList.forEach(function (item, index) {
                if(item.checked){
                    _this.totalPrice+=(item.productPrice*item.productQuantity);
                }
            })
        },
        delConfirm:function (item) {
            this.delFlag=true;
            this.curProduct=item;
        },
        delProduct:function () {
            var index=this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag=false;
        }
    }
})