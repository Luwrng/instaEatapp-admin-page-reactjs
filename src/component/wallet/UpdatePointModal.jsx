import { Form, InputNumber, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import apiClient from "../../api/axios";

const UpdatePointModal = ({ children, name, id, currentPoint, refresh }) => {
  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      form.setFieldValue("totalPoint", currentPoint);
    }
  }, [open, currentPoint, form]);

  const updatePointService = async (totalPoint) => {
    try {
      await apiClient.put(`/Wallet/${id}`, { totalPoint });
      message.success("Update point successfully");
      onClose();
      refresh();
    } catch {
      message.error("Update point failed");
    }
  };

  const onSubmit = ({ totalPoint }) => {
    updatePointService(totalPoint);
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal
        open={open}
        onCancel={onClose}
        title="Update Point"
        onOk={form.submit}
      >
        <p>
          Update point for <strong>{name}</strong>
        </p>

        <Form form={form} style={{ marginTop: 24 }} onFinish={onSubmit}>
          <Form.Item name="totalPoint">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdatePointModal;
