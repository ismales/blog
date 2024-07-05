import { useEffect } from "react";
import { ConfigProvider, Flex, Typography, Form, Input, Button } from "antd";
import styles from "./ArticleForm.module.scss";

const { Title } = Typography;

export default function ArticleForm({ formTitle, handleOnFinish, initialValues = {} }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 15,
            verticalLabelPadding: 2,
          },
          Typography: {
            titleMarginBottom: 30,
          },
          Button: {
            contentFontSizeLG: 14,
            paddingInlineLG: 50,
          },
        },
      }}
    >
      <Flex vertical align='center' justify='center' className={styles["form-container"]}>
        <Title level={4}>{formTitle}</Title>
        <Form form={form} layout='vertical' size='large' onFinish={handleOnFinish}>
          <Form.Item label='Title' name='title' rules={[{ required: true, message: "Please input title!" }]}>
            <Input placeholder='Title' />
          </Form.Item>
          <Form.Item
            label='Short description'
            name='desc'
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input placeholder='Description' />
          </Form.Item>
          <Form.Item label='Text' name='text' rules={[{ required: true, message: "Please input text!" }]}>
            <Input.TextArea placeholder='Text' autoSize={{ minRows: 6 }} />
          </Form.Item>
          <Form.Item label='Tags' className={styles["tags-container"]}>
            <Form.List name='tags'>
              {(fields, { add, remove }) => (
                <Flex gap={15}>
                  <Flex gap={15} vertical>
                    {fields.map((field) => (
                      <Flex key={field.key} gap={15}>
                        <Form.Item name={[field.name]} style={{ margin: 0 }}>
                          <Input placeholder='Tag' style={{ width: 250 }} />
                        </Form.Item>
                        <Button type='primary' danger ghost size='large' onClick={() => remove(field.name)}>
                          Delete
                        </Button>
                      </Flex>
                    ))}
                  </Flex>
                  <Button type='primary' ghost size='large' onClick={() => add()} style={{ alignSelf: "flex-end" }}>
                    Add tag
                  </Button>
                </Flex>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item>
            <Button type='primary' size='large' htmlType='submit' style={{ paddingInline: 150 }}>
              Send
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </ConfigProvider>
  );
}
