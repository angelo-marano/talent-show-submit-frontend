import React, { useState, useEffect, useCallback } from 'react';
import * as axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

const SubmissionForm = props => {
  const baseUrl = 'https://ln9yjsa4wi.execute-api.us-east-1.amazonaws.com/dev/';
  const fileInput = React.createRef();

  const onCaptchaChange = e => {
    console.log('captcha change event', e);
  };

  useEffect(() => {
    setDisable(validateState());
  }, [submission]);

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
  const [isDirty, setIsDirty] = useState(false);

  const onSubmit = e => {
    e.preventDefault();

    debugger;

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
        alert(JSON.stringify(response));
      })
      .catch(error => {
        alert('There was a problem submitting your video');
        alert(JSON.stringify(error));
        console.error(error);
      });
  };

  const validateState = () => {
    const { firstName, lastName, email, title, captcha } = submission;
    return firstName && lastName && email && title && captcha;
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        type="text"
        value={submission.firstName}
        onChange={e =>
          setSubmission({ ...submission, firstName: e.target.value })
        }
      ></input>

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        type="text"
        value={submission.lastName}
        onChange={e =>
          setSubmission({ ...submission, lastName: e.target.value })
        }
      ></input>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={submission.email}
        onChange={e => setSubmission({ ...submission, email: e.target.value })}
      ></input>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={submission.title}
        onChange={e => setSubmission({ ...submission, title: e.target.value })}
      ></input>

      <label htmlFor="notes">Notes</label>
      <textarea
        id="notes"
        value={submission.notes}
        onChange={e => setSubmission({ ...submission, notes: e.target.value })}
      ></textarea>

      <input type="file" name="file" id="file" ref={fileInput}></input>

      <ReCAPTCHA
        sitekey="6LehGPEUAAAAAORH3KkO0xE40zT7VERLJd0njxzS"
        onChange={onCaptchaChange}
      />

      <button disabled={disable} className="button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default SubmissionForm;
