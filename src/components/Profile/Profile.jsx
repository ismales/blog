import { ConfigProvider, Flex, Typography, Form, Input, Button } from "antd";
import styles from "./Profile.module.scss";

const { Title } = Typography;

export default function Profile() {
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
      <Flex vertical align='center' justify='center' className={styles["profile-container"]}>
        <Title level={4}>Edit Profile</Title>
        <Form form={form} layout='vertical' size='large' onFinish={handleFinish} onFinishFailed={handleFinishFailed}>
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder='New username' />
          </Form.Item>
          <Form.Item
            label='Email address'
            name='Email'
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder='New email' />
          </Form.Item>
          <Form.Item
            label='New Password'
            name='NewPassword'
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, max: 40, message: "Password must be between 6 and 40 characters" },
            ]}
          >
            <Input.Password placeholder='New password' />
          </Form.Item>
          <Form.Item
            label='Avatar image (url)'
            name='NewAvatar'
            valuePropName='NewAvatar'
            rules={[
              { required: true, message: "Please input avatar URL!" },
              { type: "url", message: "Please enter a valid URL!" },
            ]}
          >
            <Input placeholder='Avatar image' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' block size='large' htmlType='submit'>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </ConfigProvider>
  );
}
