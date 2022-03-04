$(function () {
    getUserInfo();

    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        // console.log('ok')

        layer.confirm('确定退出账户吗', {
            btn: ['确定', '取消'] //可以无限个按钮
        }, function (index, layero) {
            //按钮【按钮一】的回调
            // 清楚本地token
            localStorage.removeItem('token')
            // 转页面
            location.href = "./login.html";
        });
    })
})


function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",
        method: 'GET',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data);
        }
        //complete:function(res){
        //     // console.log('执行了complete');
        //     // console.log(res)
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         // 强制清除token
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        // 渲染用户头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first)
    }
}