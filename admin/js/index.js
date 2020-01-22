$(function () {
    /*1.查询个人信息
    1.1 页面一加载发送ajax请求
    1.2 响应数据之后渲染到页面 
    */
    //1.1 ajax请求
    $.ajax({
        url: BigNew.user_info,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            console.log(backData);
            //1.2 渲染页面
            $('.user_info>img').attr('src', backData.data.userPic);
            $('.user_center_link>img').attr('src', backData.data.userPic);
            $('.user_info>span').text('欢迎  ' + backData.data.nickname);
        }
    });

    /*2.退出登录
    2.1 删除token
    2.2 跳转登录页
     */
    $('.logout').click(function () {
        //2.1 删除token
        localStorage.removeItem('token');
        //2.2 跳转登录页
        window.location.href = './login.html';
    });

    /* 3.点击左侧导航栏效果 */
    //1.一级列表
    $('.level01').click(function () {
        //1.1 排他思想修改样式
        $(this).addClass('active').siblings().removeClass('active');
        //1.2 如果点击的是文章管理：则应该下滑二级列表ul
        if ($(this).next().hasClass('level02')) {
            //滑入滑出切换
            $(this).next().slideToggle();
            //旋转90度切换
            $(this).find('b').toggleClass('rotate0');
            //默认选中第一个 : DOM对象
            $('.level02>li>a').first()[0].click();
        } else {
            //如果点击的不是文章管理一级菜单列表，则移除二级列表的选中样式
            $('.level02>li').removeClass('active');
        }
    });

    //2.二级列表
    $('.level02>li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
});