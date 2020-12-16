import React, { useState } from 'react';
import { Input, InputNumber, AutoComplete } from 'antd';
import { mockData } from '@/types/mockData';
import { getDataTree } from './map';
import styles from './index.less';

const initialValue: mockData[] = [
    { label: 'code', value: '200', id: 2, pid: 1 },
    { label: 'count', value: '50', id: 3, pid: 1 },
    { label: 'result', value: 'success', id: 4, pid: 1 },
    { label: 'data', value: 'arrayValue', id: 5, pid: 1 },
    { label: '', value: '', id: 6, pid: 5 },
];

const valueData = ['arrayValue', 'objectValue'];

const MockData: React.FC = () => {
    const [dataList, setDataList] = useState<mockData[]>(initialValue);

    const dataListTree = getDataTree(dataList);

    const onChangeLabel = (text: string, id: number) => {
        const list = [...dataList];
        list.forEach(item => {
            if (item.id === id) {
                item.label = text;
            }
        });
        setDataList(list);
    };

    const onChangeLabelMin = (text: number, id: number) => {
        const list = [...dataList];
        list.forEach(item => {
            if (item.id === id) {
                item.labelMin = text;
            }
        });
        setDataList(list);
    };

    const onChangeLabelMax = (text: number, id: number) => {
        const list = [...dataList];
        list.forEach(item => {
            if (item.id === id) {
                item.labelMax = text;
            }
        });
        setDataList(list);
    };

    const onChangeValue = (text: string, id: number) => {
        const list = [...dataList];
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list[i].value = text;
                break;
            }
        }
        if (text === 'objectValue') {
            list.push({ label: '', value: '', id: Math.random(), pid: id });
        } else if (text === 'arrayValue') {
            list.push({ label: '', value: '', id: Math.random(), pid: id });
        } else {
            // 清空子项
            for (let i = list.length - 1; i >= 0; i--) {
                if (list[i].pid === id) {
                    list.splice(i, 1);
                }
            }
        }
        setDataList(list);
    };

    /**
     * 渲染单条mock数据
     */
    const renderMockItem = (item: mockData) => (
        <div className={styles.mockData} key={item.id}>
            <Input placeholder="value" value={item.label} style={{ width: '100px' }} onChange={e => onChangeLabel(e.target.value, item.id)} />
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <InputNumber placeholder="min" value={item.labelMin} style={{ width: '60px' }} onChange={value => onChangeLabelMin(value, item.id)} min={1} />
                &nbsp;&nbsp;-&nbsp;&nbsp;
            <InputNumber placeholder="max" value={item.labelMax} style={{ width: '60px' }} onChange={value => onChangeLabelMax(value, item.id)} min={1} />
                &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;
            <AutoComplete
                value={item.value}
                style={{ width: '100px' }}
                dataSource={valueData}
                onChange={(value: string) => onChangeValue(value, item.id)} />
            {
                item.value === 'objectValue' && renderObjectMockData(item.objectValue, item.id)
            }
            {
                item.value === 'arrayValue' && renderArrayMockData(item.arrayValue)
            }
        </div>
    );

    /**
     * 渲染对象mock数据
     */
    const renderObjectMockData = (data: mockData[], index: number) => (
        <div className={styles.mockBlock} key={index}>
            <div className={styles.brackets}>{'{'}</div>
            {
                data.map((item) => renderMockItem(item))
            }
            <div className={styles.brackets}>{'}'}</div>
        </div>
    );

    /**
     * 渲染数组mock数据
     */
    const renderArrayMockData = (data: mockData[][]) => (
        <div className={styles.mockBlock}>
            <div className={styles.brackets}>[</div>
            {
                data.map((item, index) => renderObjectMockData(item, index))
            }
            <div className={styles.brackets}>]</div>
        </div>
    );

    return (
        <div className={styles.mockBox}>
            {renderObjectMockData(dataListTree, 1)}
        </div>
    );
};

export default MockData;
