import React, { useState, useEffect, useCallback } from 'react';
import * as axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const SubmissionForm = props => {
  const validExtensions = [
    'MPEG',
    'MPE',
    'MPG',
    'M4V',
    'MOV',
    'WMV',
    'MXF',
    'M1V',
    'AVI',
  ];

  const baseUrl = 'https://ln9yjsa4wi.execute-api.us-east-1.amazonaws.com/dev/';
  const fileInput = React.createRef();

  const onCaptchaChange = e => setSubmission({...submission, captcha : e});

  const [submission, setSubmission] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    notes: '',
    s3Path: '',
    captcha: '',
  });

  const [disable, setDisable] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    setValidationErrors(validateState());
    setDisable(Object.keys(validationErrors).length > 0);
  }, [submission]);

  const getExtension = filename => filename.split('.').pop();

  const onCloseModal = () => {
    setSubmission({});
    setOpen(false);
    setModalMessage("");
  }

  const onSubmit = e => {
    e.preventDefault();
    
    setModalMessage("We are uploading your submission! Please stand by...");
    setOpen(true);

    const file = fileInput.current.files[0];

    const metadata = {
      'submission-details': JSON.stringify(submission),
    };

    const uploadUrlRequest = {
      name: file.name,
      type: file.type,
      metadata: metadata,
    };

    const uploadUrl = baseUrl + 'uploadUrl';

    axios
      .post(uploadUrl, uploadUrlRequest)
      .then(requestUploadUrlResponse => {
        console.log('request upload url response', requestUploadUrlResponse);
        const options = { headers: { 'Content-Type': file.type, ...metadata } };
        return axios.put(
          requestUploadUrlResponse.data.uploadURL,
          file,
          options
        );
      })
      .then(response => {
        setModalMessage("Successfully submitted! Thank you!")
      })
      .catch(error => {
        setModalMessage("There was a problem submitting your video.");
        console.error(error);
      });
  };

  const validateState = () => {
    let errors = {};

    const { firstName, lastName, email, title, captcha } = submission;

    if (!firstName) {
      errors['firstName'] = 'First Name is required.';
    }

    if (!lastName) {
      errors['lastName'] = 'Last Name is required.';
    }

    if (!email) {
      errors['email'] = 'Email is required.';
    }

    if (!captcha) {
      errors['captcha'] = 'Captcha is required.';
    }

    const file = fileInput.current.files[0];

    if (!file) {
      errors['file'] = 'File is required.';
    } else {
      const fileExtension = getExtension(file.name).toUpperCase();
      if (validExtensions.indexOf(fileExtension) === -1) {
        errors[
          'file'
        ] = `File extension is not valid. Must be one of ${validExtensions.join(
          ', '
        )}`;
      }
    }

    return errors;
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="firstName">
        First Name <small>required</small>
      </label>
      <input
        required
        id="firstName"
        type="text"
        value={submission.firstName}
        onChange={e =>
          setSubmission({ ...submission, firstName: e.target.value })
        }
      ></input>

      <label htmlFor="lastName">
        Last Name <small>required</small>
      </label>
      <input
        required
        id="lastName"
        type="text"
        value={submission.lastName}
        onChange={e =>
          setSubmission({ ...submission, lastName: e.target.value })
        }
      ></input>

      <label htmlFor="email">
        Email <small>required</small>
      </label>
      <input
        required
        id="email"
        type="email"
        value={submission.email}
        onChange={e => setSubmission({ ...submission, email: e.target.value })}
      ></input>

      <label htmlFor="title">
        Title <small>required</small>
      </label>
      <input
        required
        id="title"
        type="text"
        value={submission.title}
        onChange={e => setSubmission({ ...submission, title: e.target.value })}
      ></input>

      <label htmlFor="notes">
        Notes <small>optional</small>
      </label>
      <textarea
        id="notes"
        value={submission.notes}
        onChange={e => setSubmission({ ...submission, notes: e.target.value })}
      ></textarea>

      <label htmlFor="file">
        File{' '}
        <small>
          required, (must be one of the following: {validExtensions.join(', ')})
        </small>
      </label>
      
      <input type="file" name="file" id="file" ref={fileInput}></input>

      <ReCAPTCHA
        sitekey="6LehGPEUAAAAAORH3KkO0xE40zT7VERLJd0njxzS"
        onChange={onCaptchaChange}
      />

      <button disabled={disable} className="button" type="submit">
        Submit
      </button>

      <Modal open={open} onClose={onCloseModal} center>
        <h2>{modalMessage}</h2>
      </Modal>
    </form>
  );
};

export default SubmissionForm;
