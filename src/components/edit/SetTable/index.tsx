import React, { useState } from 'react';
import { Input, Button } from 'antd';
import styles from './index.less';

interface IProps {
    columns: any[];
    onChange: (values: any) => void;
}

const SetTable: React.FC<IProps> = (props) => {
    const columnList = [...props.columns];
    const [columns, setColumns] = useState(columnList);

    /**
     * 添加
     */
    const addColumn = () => {
        const list = [...columns];
        list.push({
            title: `属性${list.length + 1}`,
            dataIndex: `属性${list.length + 1}`,
        });
        setColumns(list);
    };

    /**
     * 修改
     */
    const changeColumn = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const list = [...columns];
        list[index].title = e.target.value;
        list[index].dataIndex = e.target.value;
        setColumns(list);
    };

    /**
     * 删除
     */
    const deleteColumn = (index: number) => {
        const list = [...columns];
        list.splice(index, 1);
        setColumns(list);
    };

    /**
     * 提交
     */
    const submit = () => {
        const dataSource = [];
        const data: any = {};
        columns.forEach(column => {
            data[column.dataIndex] = '测试数据';
        });
        dataSource.push({ ...data, id: Math.random() });
        dataSource.push({ ...data, id: Math.random() });
        props.onChange({
            dataSource,
            columns,
        });
    };

    return (
        <div>
            <div className={styles.tableTop}>
                <div className={styles.tableTitle}>table属性</div>
                <div>
                    <Button type="primary" size="small" style={{ marginRight: '10px' }}>添加操作</Button>
                    <Button type="primary" icon="plus" size="small" onClick={() => addColumn()} />
                </div>
            </div>
            {
                columns.map((colum, index) => (
                    <div className={styles.tableItem} key={index}>
                        <Input style={{ width: '150px', marginRight: '10px' }} value={colum.title} onChange={(e) => changeColumn(e, index)} />
                        <Button type="primary" icon="minus" size="small" onClick={() => deleteColumn(index)} />
                    </div>
                ))
            }
            <Button type="primary" size="small" onClick={() => submit()}>提交</Button>
        </div>
    );
};

export default SetTable;
