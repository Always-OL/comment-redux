> 前言
* connect接收两个参数，mapStateToProps，mapDispatchToProps，前者是当前组件需要获取的state状态，后者是提供修改state的方法。将返回一个函数，此函数接收一个组件，返回一个新的组件。
### 未引入react-redux之前页面布局
![未引入之前](https://raw.githubusercontent.com/Always-OL/comment-redux/master/src/images/1.png)
全部的操作都由app组件来管理，包括表单提交，存放数据，提供删除函数
### 引入react-redux后
![引入之后](https://raw.githubusercontent.com/Always-OL/comment-redux/master/src/images/2.png)
所有的操作都交给containers处理，Input和List变成了Dumb纯函数，只从父级拿数据过来，可复用性较高
