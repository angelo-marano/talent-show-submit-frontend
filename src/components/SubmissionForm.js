import React, { useState } from 'react'
import * as axios from 'axios';

const SubmissionForm = props => {
  
  const postUrl = 'https://ln9yjsa4wi.execute-api.us-east-1.amazonaws.com/dev/submission';
  const fileInput = React.createRef();
  
  const [submission, setSubmission] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    notes: '',
    s3Path: ''
  })

  const onSubmit = async e => {
    e.preventDefault()
    const file = fileInput.current.files[0];
    const postData = JSON.stringify(submission);
    const response = await axios.post(postUrl, submission);

    alert(JSON.stringify(response));
  }

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

      <input type="file" name="file" id="file" ref={fileInput}>

      </input>

      <button className="button" type="submit">
        Submit
      </button>
    </form>
  )
}

export default SubmissionForm
