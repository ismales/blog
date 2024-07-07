import { useEffect } from "react";
import { ConfigProvider, Flex, Typography, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router";
import { useForm } from "antd/es/form/Form";
import { useGetUserQuery, useEditProfileMutation } from "../../redux/userApi";
import styles from "./Profile.module.scss";

const { Title } = Typography;

export default function Profile() {
  const navigate = useNavigate();
  const { data = {} } = useGetUserQuery();
  const { user = {} } = data;
  const { username: oldUsername, email: oldEmail, image: oldImage } = user;
  const [form] = useForm();
  const [updateProfile] = useEditProfileMutation();

  useEffect(() => {
    form.setFieldsValue({
      oldUsername,
      oldEmail,
      oldImage,
    });
  }, [form, oldUsername, oldEmail, oldImage]);

  const handleFinish = async ({ oldUsername: username, oldEmail: email, password, oldImage: image }) => {
    const request = {
      user: {
        username,
        email,
        password,
        image,
      },
    };

    await updateProfile(request)
      .unwrap()
      .then(() => {
        message.success("Profile updated!");
        navigate("/");
      })
      .catch((e) => {
        if (e.data.errors.username) {
          message.error(`Username ${username} already exists.`);
        }

        if (e.data.errors.email) {
          message.error(`Email ${email} already exists.`);
        }
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
          },
        },
      }}
    >
      <Flex vertical align='center' justify='center' className={styles["profile-container"]}>
        <Title level={4}>Edit Profile</Title>
        <Form form={form} layout='vertical' size='large' onFinish={handleFinish}>
          <Form.Item
            label='Username'
            name='oldUsername'
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder='New username' />
          </Form.Item>
          <Form.Item
            label='Email address'
            name='oldEmail'
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder='New email' />
          </Form.Item>
          <Form.Item
            label='New Password'
            name='password'
            rules={[{ min: 6, max: 40, message: "Password must be between 6 and 40 characters" }]}
          >
            <Input.Password placeholder='New password' />
          </Form.Item>
          <Form.Item
            label='Avatar image (url)'
            name='oldImage'
            rules={[{ type: "url", message: "Please enter a valid URL!" }]}
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
