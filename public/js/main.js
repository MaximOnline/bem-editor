/**
 * Created by nikolaymendyaev on 15.11.14.
 */
var editor = angular.module('editor', ['ui.sortable']);

var controllers = [
    {
        title: 'Layer',
        entity: 'layer',
        list: [
            {
                title: 'left-image',
                entity: 'left_image',
                slots: [
                    {
                        title: 'Image',
                        allowed: ['image'],
                        max: 1,
                        entity: 'image_container'
                    },
                    {
                        title: 'Text',
                        allowed: ['text'],
                        entity: 'text_container'
                    }
                ]
            },
            {
                title: 'right-image',
                entity: 'right_image',
                slots: [
                    {
                        title: 'Image',
                        allowed: ['image'],
                        max: 1,
                        entity: 'image_container'
                    },
                    {
                        title: 'Text',
                        allowed: ['text'],
                        entity: 'text_container'
                    }
                ]
            }
        ]
    },
    {title: 'Image', entity: 'image'},
    {title: 'Text', entity: 'text'},
    {title: 'Service', list: ['voting'], entity: 'service'}
];

var modes = [
    {title: 'Content Level', entity: 'block'},
    {title: 'Structure Level', entity: 'structure'}
];

function BlockFactory(type, subtype){
    var obj = {
        type: type
    };
    switch(type.entity){
        case 'text':
            obj.content = '';
            break;
        case 'image':
            obj.content = [];
            break;
        case 'layer':
            obj.content = [];
            break;
        case 'service':
            obj.content = {};
            break;
    }
    if (subtype)
        obj.subtype = subtype;
    return obj;
}

editor.controller('Editor', function ($scope) {
    $scope.controllers = controllers;
    $scope.content = [];
    $scope.modes = modes;
    $scope.controllersCurList = [];
    $scope.currentMode = 'block';
    $scope.addItem = function(type){
        $scope.controllersCurList = [];
        $scope.controllersCurItem = false;
        if (!!type.list)
        {
            $scope.controllersCurList = type.list;
            $scope.controllersCurItem = type;
        }
        else
            $scope.content.push(BlockFactory(type));
    };
    $scope.addSubItem = function(subtype){
        $scope.content.push(BlockFactory($scope.controllersCurItem, subtype));
    };
    $scope.addItemToBlock = function(block, slot, ent){
        console.log(index);
        var index = block.subtype.slots.indexOf(slot);
        while(block.content.length <= index)
            block.content.push([]);
        block.content[index].push(BlockFactory(controllers[controllers.map(function(x){return x.entity;}).indexOf(ent)]));
    };
    $scope.deleteSubItem = function(block, slot, inBlock){
        var index = block.subtype.slots.indexOf(slot);
        var contentNum = block.content[index].indexOf(inBlock);
        block.content[index].splice(contentNum, 1);
    };
    $scope.deleteBlock = function(block){
        $scope.content.splice($scope.content.indexOf(block),1);
    };
    $scope.updateText = function(el, block){
        block.content = el.value;
    };
    $scope.setMode = function(mode){
        $scope.currentMode = mode;
    };
    $scope.sortOptions = {
        handle: '.block__move',
        connectWith: '.items'
    };
    $scope.sortInnerOptions = {
        handle: '.block__inner_move',
        connectWith: '.items',
        update: function(event, ui) {
            // on cross list sortings recieved is not true
            // during the first update
            // which is fired on the source sortable
            if (!ui.item.sortable.received && ui.item.sortable.droptarget.scope().slot){
                var entity = ui.item.scope().inBlock ? ui.item.scope().inBlock.type.entity : ui.item.block.type.entity;
                var allowed = ui.item.sortable.droptarget.scope().slot.allowed;
                if (allowed.indexOf(entity)<0){
                    ui.item.sortable.cancel();
                    alert('Not valid type');
                }
            }
        }
    };
    $scope.save = function(id){
        var data = $scope.content.map(function(x){
            var obj = {
                block: x.type.entity
            };
            if (x.content instanceof Array)
            {
                obj.content = x.content.map(function(j, index){
                    return {
                        content: j.map(function(i){
                            return {
                                block: i.type.entity,
                                content: i.content
                            };
                        }),
                        elem: x.subtype.slots[index].entity
                    }
                });
            }
            else{
                obj.content = x.content;
            }
            return obj;
        });
        $.ajax({
            type: 'POST',
            url: '/make_article',
            data: JSON.stringify({
                id: id,
                data: {
                    block: 'article',
                    content: data
                }
            }),
            contentType: 'application/json',
            success: function(){
                alert('saved');
            }
        });
    };
});
