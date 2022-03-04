$(function () {
    // 点击后去注册页
    $('#loginChange').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击后去登录页
    $('#regChange').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        },
        // 注册时检验密码和确人密码是否相同
        repwd: function (value) {
            var pwd1 = $('.reg-box [name=password]').val();
            if (pwd1 !== value) {
                return '两次输入的密码不一致！'
            }
        }
    });

    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', {
            username:$('#form-reg [name=username]').val(),
            password:$('#form-reg [name=password]').val()
        },
            function (res) {
                if (res.status !== 0) {
                    // return console.log(res.message)
                    return layer.msg(res.message);
                }
                // console.log('注册成功！')
                layer.msg('注册成功,请登录！');

                $('#regChange').click();
            })
    });


    $('#form-login').submit(function(e){
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                console.log(res)
                if(res.status !== 0){
                    return layer.msg('登录失败,您输入的账户或密码错误');
                    
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href = './index.html'
            }
        })
    })


})