import React from 'react';
import Quagga from 'quagga';
import PropTypes from 'prop-types';

class ScannerSettings extends React.Component {
    
    render() {
        return (
            <div id="interactive" className="viewport"/>
        );
    }

    componentDidMount() {
        Quagga.init({
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: 320,
                    height: 240,
                    facingMode: "environment" // or user
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 2,
            decoder: {
                readers : [ 
                'upc_reader',
                'upc_e_reader'
                ]
                
            },
            locate: true
        }, function(err) {
            if (err) {
                alert("Camera not found")
                return console.log(err);
            }
            Quagga.start();
        });
        Quagga.onDetected(this._onDetected);
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
    }

    _onDetected = (result) => {
        this.props.onDetected(result);
    }
};

ScannerSettings.propTypes = {
    onDetected: PropTypes.func.isRequired
}

export default ScannerSettings;