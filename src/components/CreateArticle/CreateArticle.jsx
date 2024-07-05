import { ConfigProvider, Flex, Typography, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router";
import styles from "./CreateArticle.module.scss";
import { useAddArticleMutation } from "../../redux/articlesApi";

const { Title } = Typography;

export default function CreateArticle() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [addArticle] = useAddArticleMutation();

  const handleOnFinish = async ({ desc: description, tags: tagList, text: body, title }) => {
    const request = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };

    await addArticle(request)
      .unwrap()
      .then(() => {
        message.success("Article created!");
        navigate("/");
      })
      .catch((e) => {
        message.error(e.data.errors);
      });
  };

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
      <Flex vertical align='center' justify='center' className={styles["new-article-container"]}>
        <Title level={4}>Create new article</Title>
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
              {(fileds, { add, remove }) => (
                <Flex gap={15}>
                  <Flex gap={15} vertical>
                    {fileds.map((field) => (
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
