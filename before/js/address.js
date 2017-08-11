var vm=new Vue({
    el:".container",
    data:{
        addressList:[],
        listNum:3,
        currentIndex:0,
        buyMethod:1,
    },
    mounted:function(){
        this.$nextTick(function(){
            this.getAddressList();
            console.log(this.addressList);
        });
    },
    computed:{
        filterAddress:function(){
            return this.addressList.slice(0,this.listNum);
        }
    },
    methods:{
        getAddressList:function(){
            var _this=this;
            $.ajax({
                url:'data/address.json',
                type:'POST',
                success:function(e){
                    _this.addressList= e.result;
                },
                error:function(){
                    alert('获取地址信息失败')
                }
            })
        },
        loadMore:function(){
            this.listNum=this.addressList.length;
        },
        setDefault:function(addressId){
            this.addressList.forEach(function(address,index){
                if(address.addressId==addressId){
                    address.isDefault=true;
                }else {
                    address.isDefault=false;
                }
            })
        }
    }
})