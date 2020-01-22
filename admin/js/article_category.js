//入口函数
$(function () {
    //1.页面一加载发送ajax请求数据
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
            //模板引擎渲染页面 
            $('.category_table>tbody').html(template('art_cat', backData));
        }
    });

    /*技术难点 
    1.点击新增按钮与编辑按钮都要弹出模态框
    2.新增按钮的业务逻辑与编辑按钮业务逻辑不同
        新增按钮弹出的模态框
            (1)表单文本清空
            (2)点击取消，清空表单文本方便下一次添加
            (3)点击新增：ajax发送请求给服务器
                url:/admin/category/add
                参数： name : 分类名称  slug:分类别名
        编辑按钮弹出的模态框
            (1)表单文本为当前点击编辑的文字类别数据
            (2)点击取消：清空表单文本方便下一次编辑
            (3)点击编辑：ajax发送请求给服务器
                url:/admin/category/edit
                参数：name : 分类名称  slug:分类别名 id:编辑的文字id
    
    解决方案：结合bootstrap官方文档模态框使用
    1.给新增按钮与编辑按钮a标签设置行内属性：data-toggle="modal" data-target="#myModal"
        作用：点击a标签自动弹出模态框
    2.给模态框注册事件 $('#myModal').on('show.bs.modal', function (e) {})
        作用：弹出模态框之前会执行这个事件处理函数
        e.relatedTarget : 获取弹出模态框的事件触发源（点击哪个a弹出来的）
    3.给模态框的取消按钮和确认按钮注册事件
        取消按钮：隐藏模态框，并且清空表单文本： dom表单.reset()
        确认按钮：
            如果e.relatedTarget是新增 ->则执行新增按钮逻辑
            如果e.relatedTarget是编辑 ->则执行编辑按钮逻辑
    */

    //1.模态框出现之前
    $('#myModal').on('show.bs.modal', function (e) {
        // do something...
        //获取模态框事件触发源
        var target = e.relatedTarget;
        if (target == $('#xinzengfenlei')[0]) {
            //执行新增分类逻辑
            //(1)设置按钮文本为新增
            $('#myModal .confirm').text('新增');
        } else {
            //执行编辑分类逻辑
            //(1)设置按钮文本为编辑
            $('#myModal .confirm').text('编辑');
            //(2)取出当前按钮所在的tr的name值赋值给模态框的表单
            $('#recipient-name').val($(target).parent().prev().prev().text());
            //(3)取出当前按钮所在的tr的slug值赋值给模态框的表单
            $('#message-text').val($(target).parent().prev().text());
            //(2)将当前按钮的自定义属性data-id赋值给模态框编辑按钮的自定义属性data-id
            $('#myModal .confirm').attr('data-id', $(target).attr('data-id'));
        }
    });

    //2.取消按钮点击事件
    $('#myModal .cancel').on('click', function (e) {
        // do something...
        //清空文本框数据 ：这是DOM原生的方法
        $('#form')[0].reset();
        //隐藏模态框
        $('#myModal').modal('hide')
    });

    //3.确认按钮点击事件
    $('#myModal .confirm').on('click', function (e, a) {
        // do something...
        if ($(this).text() == '新增') {
            $.ajax({
                url: BigNew.category_add,
                type: 'post',
                dataType: 'json',
                data: {
                    name: $('#recipient-name').val(),
                    slug: $('#message-text').val(),
                },
                success: function (backData) {
                    if (backData.code == 201) {
                        alert('新增成功');
                        window.location.reload();
                    } else {
                        alert(backData.msg);
                    };
                }
            });
        } else {//编辑
            $.ajax({
                url: BigNew.category_edit,
                type: 'post',
                dataType: 'json',
                data: {
                    name: $('#recipient-name').val(),
                    slug: $('#message-text').val(),
                    id: $(this).attr('data-id')
                },
                success: function (backData) {
                    if (backData.code == 200) {
                        alert('编辑成功');
                        window.location.reload();
                    } else {
                        alert(backData.msg);
                    };
                }
            });
        }
    });

    //4.删除按钮 ：这个按钮是动态添加的，所以需要注册委托事件
    //注意点：注册委托事件的父元素不能是动态添加的，否则无法委托
    $('.category_table>tbody').on('click', '.delete', function () {
        $.ajax({
            url: BigNew.category_delete,
            type: 'post',
            dataType: 'json',
            data: {
                id: $(this).attr('data-id')
            },
            success: function (backData) {
                if (backData.code == 204) {
                    alert('删除成功');
                    window.location.reload();
                } else {
                    alert(backData.msg);
                };
            }
        });
    });
});