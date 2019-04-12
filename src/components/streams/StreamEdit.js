import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
 
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render () {
        if (!this.props.stream) {
            return (
                <div>StreamEdit</div>
            );
        }
        
        const {title, description} = this.props.stream;

        // initialValues comes from Redux Form
        return (
            <div>
                <h3>Edite a Stream</h3>
                
                <StreamForm initialValues={{title, description}} onParentSubmit={this.onSubmit} />
            </div>
            );
    }
}

// note. ownProps is the same as props above
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);