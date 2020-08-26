import React, { Component } from 'react';
import { IMaterial } from '@/types/making';
import styles from './index.less';

interface IProps {
    materials: IMaterial[];
    addMaterial: (material: IMaterial) => void;
    setAddMaterial: (material: IMaterial) => void;
}

interface IMaterialList {
    title: string;
    id: number;
    children: IMaterial[];
}

interface IState {
    materialList: IMaterialList[];
}

class MaterialList extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            materialList: [],
        };
    }

    drag = (event: React.DragEvent<HTMLDivElement>, material: IMaterial) => {
        // @ts-ignore
        event.dataTransfer.setData('index', event.target.getAttribute('data-index'));
        this.props.setAddMaterial(material);
    }

    /**
     * 添加组件
     */
    addMaterial = (material: IMaterial) => {
        this.props.addMaterial(material);
    }

    componentDidMount() {
        const { materials } = this.props;
        const materialList = [
            { title: '基础组件', id: 1, children: [] },
            { title: '公用组件', id: 2, children: [] },
            { title: 'antd组件', id: 3, children: [] },
        ];
        materials.forEach(item => {
            if (item.from === '') {
                materialList[0].children.push(item);
            } else if (item.from === 'antd') {
                materialList[2].children.push(item);
            } else {
                materialList[1].children.push(item);
            }
        });
        this.setState({
            materialList,
        });
    }

    render() {
        const { materialList } = this.state;

        return (
            <div className={styles.materialList}>
                {
                    materialList.map(item => (
                        <div>
                            <div className={styles.materialTitle}>{item.title}</div>
                            {
                                item.children.map((material, index) => (
                                    <div
                                        key={material.tag}
                                        className={styles.materialItem}
                                        data-index={index}
                                        draggable
                                        onDragStart={(event) => this.drag(event, material)}
                                        onClick={() => this.addMaterial(material)}>
                                        {material.name}
                                        <span>&lt;{material.tag} /&gt;</span>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default MaterialList;
