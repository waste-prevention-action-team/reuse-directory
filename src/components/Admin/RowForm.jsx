import React from 'react'
import { List as ImmutableList } from 'immutable'
import PropTypes from 'prop-types'

import {
    Button,
    Input,
    Select,
    Table
} from '../../semantic'

const InputField = ({
    type,
    formula,
    extraProps,
    value,
    onChange
}) => {
    const v = formula || value || ''
    const [didMount, updateMountStatus] = React.useState(false)
    if (formula) {
        React.useEffect(() => {
            if (!didMount) {
                updateMountStatus(true)
                onChange(v)
            }
        })
    }
    switch (type) {
        case 'select':
            return <Select
                {...extraProps}
                value={v}
                onChange={(e, props) => onChange(props.value)}
            />
        case 'textarea':
            return <textarea
                value={v}
                onChange={e => onChange(e.target.value)}
            />
        case 'hidden':
            return <input type="hidden" value={v} />
        default:
            return <Input
                value={v}
                onChange={(e, props) => onChange(props.value)}
            />
    }
}

InputField.propTypes = {
    type: PropTypes.string,
    formula: PropTypes.string,
    extraProps: PropTypes.shape({}),
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

InputField.defaultProps = {
    type: null,
    formula: null,
    extraProps: {},
    value: null
}

const RowForm = ({
    columns,
    initialData,
    columnsInputTypes,
    handleAdd,
    handleUpdate,
    handleDelete
}) => {
    const [data, updateData] = React.useState(initialData)
    return (
        <Table.Row>
            <Table.Cell>
                {data.get(0)}
            </Table.Cell>
            {data.slice(1).map((cellValue, idx) => (
                <Table.Cell key={columns.get(idx + 1)}>
                    <InputField
                        {...columnsInputTypes[columns.get(idx + 1)]}
                        value={cellValue}
                        onChange={(value) => { updateData(data.splice(idx + 1, 1, value)) }}
                    />
                </Table.Cell>
            ))}
            <Table.Cell>
                {data.get(0) ?
                    <React.Fragment>
                        <Button content="Update" primary onClick={() => handleUpdate(data)} />
                        <Button content="Delete" negative onClick={() => handleDelete(data.get(0))} />
                    </React.Fragment> :
                    <Button
                        content="Add"
                        primary
                        onClick={() => {
                            handleAdd(data, () => { updateData(initialData) })
                        }}
                    />
                }
            </Table.Cell>
        </Table.Row>
    )
}

RowForm.propTypes = {
    columns: PropTypes.instanceOf(ImmutableList).isRequired,
    initialData: PropTypes.instanceOf(ImmutableList).isRequired,
    columnsInputTypes: PropTypes.shape({}),
    handleAdd: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}

RowForm.defaultProps = {
    columnsInputTypes: {}
}

export default RowForm
