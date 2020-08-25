import SetStyle from './SetStyle';
import SetClass from './SetClass';
import SetSingleProp from './SetSingleProp';
import SetTable from './SetTable';
import SetForm from './SetForm';

export { SetStyle, SetClass };

const editComponentsMap: {
    [props: string]: any;
} = {
    style: SetStyle,
    className: SetClass,
    prop: SetSingleProp,
    table: SetTable,
    form: SetForm,
};

export default editComponentsMap;
