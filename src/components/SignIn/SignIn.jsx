import { ConfigProvider, Flex, Typography, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import styles from "./SignIn.module.scss";

const { Title, Text } = Typography;

export default function SignIn() {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Form values:", values);
  };

  const handleFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
          },
        },
      }}
    >
      <Flex vertical align='center' justify='center' className={styles["sign-in-container"]}>
        <Title level={4}>Sign In</Title>
        <Form
          form={form}
          layout='vertical'
          size='large'
          style={{ width: "100%" }}
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
        >
          <Form.Item
            label='Email adress'
            name='Email adress'
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder='Email adress' />
          </Form.Item>
          <Form.Item label='Password' name='Password' rules={[{ required: true, message: "Please input your email!" }]}>
            <Input.Password placeholder='Password' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' block size='large' htmlType='submit'>
              Login
            </Button>
          </Form.Item>
        </Form>
        <Text type='secondary' style={{ fontSize: 12 }}>
          Don’t have an account?{" "}
          <Link to='/sign-up' style={{ fontSize: 12 }}>
            Sign Up.
          </Link>
        </Text>
      </Flex>
    </ConfigProvider>
  );
}
