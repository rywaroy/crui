import React from 'react';
import { ISetFormValues } from '@/types/code';
import { IMaterial } from '@/types/making';
import Modal from '../Modal';
import GenerateForm from '../GenerateForm';
import styles from './index.less';

interface IProps {
    className: string;
    modalForm: ISetFormValues[];
    visible: boolean;
    modalKey: string | number;
    title: string;
    width: string | number;
    labelCol?: { span: number };
    wrapperCol?: { span: number };
    onClick: () => void;
}

export default class GenerateModal extends React.Component<IProps, any> {
    generateModal: any;

    render() {
        const {
            className, modalForm, visible, modalKey, title, labelCol, wrapperCol,
        } = this.props;
        const modalOpts = {
            title,
            visible,
        };

        modalForm.forEach(item => {
            if (!item.span) {
                item.span = 12;
            }
        });

        return (
            <Modal {...modalOpts} key={modalKey} className={`${className} ${styles.modal} ant-modal-content`} onClick={this.props.onClick}>
                <GenerateForm formSet={modalForm} labelCol={labelCol} wrapperCol={wrapperCol} wrappedComponentRef={el => { this.generateModal = el; }} />
                {this.props.children}
            </Modal>
        );
    }
}

export const GenerateModalMaterial: IMaterial = {
    name: '表单弹窗',
    tag: 'GenerateModal',
    from: '@/components',
    id: Math.random(),
    component: GenerateModal,
    intro: '表单弹窗组件',
    props: {
        visible: true,
        title: '弹窗标题',
        modalForm: [],
    },
    haveChildren: false,
    haveWrap: false,
    editComponents: [
        { name: 'className' },
        { name: 'style' },
        { name: 'layout' },
        { name: 'form', props: { propName: 'modalForm' } },
        { name: 'prop', props: { propName: 'title', propType: 'string' } },
        { name: 'prop', props: { propName: 'visible', propType: 'boolean' } },
    ],
    ext: {
        type: 'modal',
    },
};
