import React, { useState } from 'react';
import { Formik } from 'formik';
import { createRestaurant } from '../utils';
import { Button, Form, Stack } from 'react-bootstrap';

const AddRestaurantForm = ({ setRefreshData }) => {
  const [requestError, setRequestError] = useState(null);
  return (
    <>
      <Formik
        initialValues={{ name: '' }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Name required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(true);
            createRestaurant(
              values.name,
              setSubmitting,
              setRequestError,
              setRefreshData
            );
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <Stack direction="horizontal" gap={3}>
              <Stack>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Restaurant name (don't use diacritics)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
              </Stack>
              <Button
                variant="primary"
                type="submit"
                className="float-end"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Wait...' : 'Create'}
              </Button>
            </Stack>
            <Form.Text>{errors.name && touched.name && errors.name}</Form.Text>
            <br />
            <div className="error-note">{requestError}</div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddRestaurantForm;
