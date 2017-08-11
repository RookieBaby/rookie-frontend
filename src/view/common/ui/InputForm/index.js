import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// import autobind from 'autobind-decorator'
import '../../style/core.less'
import styles from './index.less'

// @autobind
@CSSModules(styles)
class InputForm extends Component {
  static propTypes = {
    label: PropTypes.string,
    content: PropTypes.string,
    save: PropTypes.func
  }

  static defaultProps = {
    label: '',
    content: 'default'
  }

  constructor (props) {
    super(props)
    this.state = {
      showEdit: true,
      inputProps: {
        readOnly: 'readOnly'
      },
      content: this.props.content
    }
  }

  _edit () {
    console.log('edit')
    this.setState({
      showEdit: false,
      inputProps: {}
    })
    this.contentInput.focus()
  }

  _handleChange (e) {
    this.setState({
      content: e.target.value
    })
  }

  _save () {
    console.log('save')
    this.props.save()
    this.setState({
      showEdit: true,
      inputProps: {
        readOnly: 'readOnly'
      }
    })
  }

  _cancel () {
    console.log('cancel')
    this.setState({
      showEdit: true,
      inputProps: {
        readOnly: 'readOnly'
      }
    })
    this.setState({
      content: this.props.content
    })
  }

  render () {
    let {label} = this.props
    const inputForm = classNames({
      'input-form': this.state.showEdit,
      'input-form-active': !this.state.showEdit
    })
    const buttonEdit = classNames({
      'button': !this.state.showEdit,
      'button-active': this.state.showEdit
    })
    const buttonSave = classNames({
      'button': this.state.showEdit,
      'button-active': !this.state.showEdit
    })
    const buttonCancel = classNames({
      'button-cancel': this.state.showEdit,
      'button-cancel-active': !this.state.showEdit
    })
    return (
      <div styleName={inputForm}>
        <span styleName="label">{label}</span>
        <input value={this.state.content}
               styleName="content"
               onChange={(e) => this._handleChange(e)}
               ref={ref => (this.contentInput = ref)}
               {...this.state.inputProps}
        />
        <span styleName={buttonEdit} onClick={() => this._edit()}>修改</span>
        <span>
          <span styleName={buttonCancel} onClick={() => this._cancel()}>取消</span>
          <span styleName={buttonSave} onClick={() => this._save()}>保存</span>
        </span>
      </div>
    )
  }
}

export default InputForm
