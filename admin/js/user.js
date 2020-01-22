//入口函数
$(function () {
    //1.页面一加载：ajax请求个人详情信息，渲染页面
    $.ajax({
        url: BigNew.user_detail,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
            //渲染页面
            // $('input.username').val(backData.data.username);
            // $('input.nickname').val(backData.data.nickname);
            // $('input.email').val(backData.data.email);
            // $('input.password').val(backData.data.password);
            //遍历对象优化代码
            for (var key in backData.data) {
                $('input.' + key).val(backData.data[key]);
            }
            $('img.user_pic').attr('src', backData.data.userPic);
        }
    });
    //2.文件预览
    //1.给file表单元素注册onchange事件
    $('#exampleInputFile').change(function () {
        //1.2 获取用户选择的图片
        var file = this.files[0];
        //1.3 将文件转为src路径
        var url = URL.createObjectURL(file);
        //1.4 将url路径赋值给img标签的src
        $('.user_pic').attr('src', url);
    });

    //3.编辑个人信息(fromdata上传文件)
    $('#form').on('submit', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        $.ajax({
            url: BigNew.user_edit,
            type: 'post',
            dataType: 'json',
            data: new FormData(this),
            contentType: false,
            processData: false,
            success: function (backData) {
                console.log(backData);
                if (backData.code == 200) {
                    alert('修改成功');
                    /* 
                    window:            当前页面窗口 user.html
                    window.parent:     当前页面父窗口 index.html
                    */
                    parent.window.location.reload();
                }
            }
        });
    });
});