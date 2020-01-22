//入口函数


$(function() {
  /* 登录功能思路
  1.给登录按钮注册点击事件
  2.阻止默认跳转事件（表单submit会自动跳转页面）
  3.获取用户名和密码
  4.非空判断
  5.ajax发送请求
  6.处理响应结果   a.成功：跳转管理系统首页    b.失败：提示用户
   */
  //1.给登录按钮注册点击事件
  $('.input_sub').click(function(e) {
    //2.阻止默认跳转事件（表单submit会自动跳转页面）
    e.preventDefault();
    //3.获取用户名和密码
    var username = $('.input_txt').val().trim(); //去除前后空格
    var password = $('.input_pass').val().trim();
    //4.非空判断
    if (username == '' || password == '') {
      // alert('用户名与密码不能为空');
      //使用模态框
      $('.modal-body>p').text('用户名与密码不能为空');
      $('#myModal').modal({ keyboard: true }); //按ESC键可以关闭模态框
      return;
    };
    //5.ajax发送请求
    $.ajax({
      url: BigNew.user_login,
      type: 'post',
      dataType: 'json',
      data: {
        username: username,
        password: password
      },
      success: function(backData) {
        console.log(backData);
        //6.处理响应结果  a.成功：跳转管理系统首页  b.失败：提示用户
        if (backData.code == 200) {
          //alert('登录成功');
          //使用模态框
          $('.modal-body>p').text('登录成功');
          $('#myModal').modal({ keyboard: true }); //按ESC键可以关闭模态框
          $('#myModal').on('hidden.bs.modal', function(e) { //模态框隐藏事件
            //1.将服务器返回的token存入localStorage
            localStorage.setItem('token', backData.token);
            //2.跳转首页
            window.location.href = './index.html';
          });
        } else {
          alert(backData.msg);
        }
      }
    });
  });
});