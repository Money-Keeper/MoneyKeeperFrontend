import { Button, DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import type { FC } from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';

import type { Currency } from '../../../domain/Currency/Currency.entity';
import type { NewExpense } from '../../../domain/Expense/Expense.entity';

namespace ExpenseForm {
  export interface Props {
    currencies: Currency[];
    defaultValues?: Partial<NewExpense>;
    onSubmit: (values: any) => void;
  }
}

const ExpenseForm: FC<ExpenseForm.Props> = ({
  currencies,
  onSubmit,
  defaultValues = {},
}) => {
  const momentDefaultDate = useMemo(() => {
    return defaultValues?.date && moment(defaultValues?.date);
  }, []);

  return (
    <StyledForm layout="vertical" onFinish={onSubmit}>
      <Form.Item label="Amount" required>
        <Input.Group compact>
          <Form.Item
            name="currencyId"
            style={{ width: '20%' }}
            initialValue={defaultValues.currencyId || currencies[0].id}
          >
            <Select style={{ width: '100%' }}>
              {currencies.map((currency) => (
                <Select.Option key={currency.id} value={currency.id}>
                  {`${currency.name} (${currency.symbol})`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="amount"
            rules={[
              { required: true, message: 'Please input expense amount' },
              {
                validator: (rule, value) => {
                  const isNumeric = /^-?\d+$/.test(value);
                  if (!isNumeric) {
                    return Promise.reject(
                      new Error('Amount should be a number')
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
            initialValue={defaultValues.amount}
            style={{ width: '80%' }}
          >
            <Input placeholder="Input expense amount" />
          </Form.Item>
        </Input.Group>
      </Form.Item>

      <Form.Item
        name="date"
        rules={[{ required: true, message: 'Please select expense date' }]}
        label="Date"
        initialValue={momentDefaultDate}
      >
        <StyledDatePicker size="large" />
      </Form.Item>

      <Form.Item name="note" label="Note" initialValue={defaultValues.note}>
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item style={{ textAlign: 'center' }}>
        <Button size="large" htmlType="submit" type="primary" shape="round">
          Save
        </Button>
      </Form.Item>
    </StyledForm>
  );
};

export { ExpenseForm };

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

const StyledForm = styled(Form)`
  width: 100%;
`;
