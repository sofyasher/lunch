import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { addVote, getRestaurants } from '../utils';
import { Button, Form, Stack } from 'react-bootstrap';

const AddVoteForm = ({ setRefreshData, refreshData }) => {
  const [requestError, setRequestError] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    getRestaurants(setRestaurants);
  }, [refreshData]);
  return (
    <>
      <Formik
        initialValues={{ personName: '', restaurantId: '1' }}
        validate={(values) => {
          const errors = {};
          if (!values.personName) {
            errors.personName = 'Name required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(true);
            addVote(
              values.personName,
              values.restaurantId,
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
              <Form.Control
                type="text"
                name="personName"
                placeholder="Your name (don't use diacritics)"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.personName}
              />
              <Form.Select
                name="restaurantId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.restaurantId}
              >
                {restaurants?.map((restaurant) => (
                  <option value={restaurant.id}>{restaurant.name}</option>
                ))}
              </Form.Select>
              <Button
                variant="primary"
                type="submit"
                className="float-end"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Wait...' : 'Add'}
              </Button>
            </Stack>
            <Form.Text>
              {errors.personName && touched.personName && errors.personName}
            </Form.Text>
            <br />
            <div className="error-note">{requestError}</div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddVoteForm;
