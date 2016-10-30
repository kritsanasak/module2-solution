(function() {
    'use strict';
    angular.module('ShoppingListCheckOffApp', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

    ToBuyController.$inject = ["ShoppingListCheckOffService"];
    function ToBuyController(ShoppingListCheckOffService){
        var toBuy = this;
        toBuy.items = ShoppingListCheckOffService.getItems();
        toBuy.listsLength = ShoppingListCheckOffService.getListLength();

        toBuy.isEmpty = function(){
            return toBuy.listsLength--;
        }

        toBuy.removeItemBrought = function(itemIndex){
            if(toBuy.isEmpty() == 0){
                alert("Congratulation already brought all items");
            } else {
               ShoppingListCheckOffService.removeItem(itemIndex);
            }
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController (ShoppingListCheckOffService){
        var already = this;

        already.itemsBroughtLength = ShoppingListCheckOffService.getBroughtLength() ;

        already.items = ShoppingListCheckOffService.getItemsBrought();

        already.broughtLength = already.items.length;
    }

    // If not specified, maxItems assumed unlimited
    function ShoppingListCheckOffService() {
        var service = this;
        var itemsBrought = [];
        var lengthOfBrought = itemsBrought.length ;
        // List of items to buy
        var items = [{
            name: "Cookies",
            quantity: 100
        }, {
            name: "Chips",
            quantity: 100
        },{
            name: "Pepto Bismol",
            quantity: 24
        },{
            name: "Drink sugary",
            quantity: 24
        },{
            name: "Chocolate Chips",
            quantity: 48
        }];

        service.addItem = function(itemName, quantity) {
            if ((maxItems === undefined) ||
                (maxItems !== undefined) && items.length < maxItems) {
                var item = {
                    name: itemname,
                    quantity: quantity
                };
                items.push(item);

            } else {
                throw new Error('Max items (' + maxItems + ") reached");
            }
        };

        service.removeItem = function(itemIndex){
            service.addBroughtItems(items[itemIndex]);
            service.getBroughtLength();
            items.splice(itemIndex,1);
        };

        service.getItems = function(){
          return items;
        };

        service.addBroughtItems =function(item){
            itemsBrought.push(item);
        }

        service.getItemsBrought = function(){
            return itemsBrought;
        }

        service.getListLength = function(){
            return items.length;
        }

        service.getBroughtLength = function(){

            service.lengthOfBrought = itemsBrought.length ;
            // alert(service.lengthOfBrought);
            return ;
        }

        service.isEmptyLists = function(){
            if(items.length === 0){
                return true;
            }else{
                return false;
            }
        }

        service.isEmptyBroughtItems = function(){
            if(itemsBrought.length > 0){
                return true;
            } else{
                return false;
            }
        }
    }

})();
