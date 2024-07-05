import { useNavigate } from "react-router";
import { ConfigProvider, Flex, Typography, Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.scss";
import { useEditProfileMutation } from "../../redux/userApi";
import { editProfile } from "../../redux/userSlice";

const { Title } = Typography;

export default function Profile() {
  const dispatch = useDispatch();
  const { username: oldUsername, email: oldEmail, image: oldImage } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [updateProfile] = useEditProfileMutation();

  const handleFinish = async ({ username, email, password, image }) => {
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
      .then((data) => {
        message.success("Profile updated!");
        dispatch(editProfile(data.user));
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
        <Form
          form={form}
          layout='vertical'
          size='large'
          onFinish={handleFinish}
          initialValues={{ username: oldUsername, email: oldEmail, image: oldImage }}
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder='New username' />
          </Form.Item>
          <Form.Item
            label='Email address'
            name='email'
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
            name='image'
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
