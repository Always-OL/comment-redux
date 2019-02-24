import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentList from '../components/CommentList'
import { initComments, deleteComment } from '../reducers/comments'

class CommentListContainer extends Component {
    static propTypes = {
        comments: PropTypes.array,
        initComments: PropTypes.func,
        onDeleteComment: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.handleDeleteComment = this.handleDeleteComment.bind(this)
    }
    componentWillMount() {
        //执行完这一步，并没有将comments传递给子组件，而是调用了dispatch将数据
        //给了store，这才获得了this.props.comments
        this._loadComments()
    }

    _loadComments() {
        // 从 LocalStorage 中加载评论
        let comments = localStorage.getItem('comments')
        comments = comments ? JSON.parse(comments) : []
        // this.props.initComments 是 connect 传进来的
        // 可以帮我们把数据初始化到 state 里面去
        this.props.initComments(comments)
    }

    handleDeleteComment(index) {
        const { comments } = this.props;
        // props 是不能变的，所以这里新建一个删除了特定下标的评论列表
        const newComments = {
            comments: [
                ...comments.slice(0, index),
                ...comments.slice(index + 1)
            ]
        }
        localStorage.setItem('comments', JSON.stringify(newComments))
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }


    render() {
        return (
            <CommentList
                comments={this.props.comments}
                onDeleteComment={this.handleDeleteComment} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteComment: (commentIndex) => {
            dispatch(deleteComment(commentIndex))
        },
        initComments: (comments)=>{
            dispatch(initComments(comments))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentListContainer)