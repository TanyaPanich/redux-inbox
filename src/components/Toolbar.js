import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  composeMessage,
  deleteMessages,
  toggleSelectAll,
  markReadSelected,
  markUnreadSelected,
  addLabelToMessages,
  removeLabelFromMessages
} from '../actions/toolbar.js'

const Toolbar = ({
  messagesState,
  composeMessage,
  deleteMessages,
  toggleSelectAll,
  markReadSelected,
  markUnreadSelected,
  addLabelToMessages,
  removeLabelFromMessages
  }) => {

  const getCheckBoxClassName = () => {
    return {'NONE': 'fa fa-square-o',
            'SOME': 'fa fa-minus-square-o',
            'ALL': 'fa fa-check-square-o'
           }[messagesState.allSelected]
  }

  return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">
              {messagesState.unreadCount}
            </span>
            unread messages
          </p>

          <a className="btn btn-danger">
            <i className="fa fa-plus"
              onClick={() => {
                composeMessage()}}>
            </i>
          </a>

          <button className="btn btn-default"
                  onClick={() => {
                    toggleSelectAll()}}>
            <i className={getCheckBoxClassName()}></i>
          </button>

          <button className="btn btn-default"
                  onClick={() => {
                    markReadSelected()}}>
            Mark As Read
          </button>

          <button className="btn btn-default"
                  onClick={() => {
                    markUnreadSelected()}}>
            Mark As Unread
          </button>

          <select className="form-control label-select"
                  onChange={(e) => {
                    console.log('Inside Toolbal, label', e.target.value)
                    addLabelToMessages(e.target.value)
                  }}>
            <option value={false}>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select"
                  onChange={(e) => {
                    removeLabelFromMessages(e.target.value)
                  }}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default"
                  onClick={() => {
                    deleteMessages()
                  }}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
}


const mapStateToProps = (state) => {
  return {messagesState: state.messagesState}
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
  composeMessage,
  deleteMessages,
  toggleSelectAll,
  markReadSelected,
  markUnreadSelected,
  addLabelToMessages,
  removeLabelFromMessages
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar)
