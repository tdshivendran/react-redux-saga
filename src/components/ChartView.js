import React from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import connect from "react-redux/es/connect/connect";
import moment from 'moment';

const initialState = {
    barIndex : 'uv',
    left : 0,
    right : 0
};

class ChartView extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;

        this.handleChangeData=this.handleChangeData.bind(this);
    }

    handleChangeData() {

        // shift
        this.setState(({left = 0}) => {
            return {
                animation: true,
                left: left - 2
            };
        });

    };

    componentWillReceiveProps(){
        this.handleChangeData();
    }

    render() {
        const {drone_data} = this.props;
        const {animation, left} = this.state;

        var arr_drone_data = Array.from(Object.keys(drone_data), k=>drone_data[k]);

        return (
            <div style={{ position: 'relative', width: '100%' }}>
                <ResponsiveContainer width = '100%' height = {400} >
                    <LineChart
                        width={800}
                        height={400}
                        data={arr_drone_data}
                        margin={{top: 20, right: 20, bottom: 20, left: 0}}
                    >
                        <CartesianGrid stroke='#f5f5f5'/>
                        <XAxis
                            label={{ value: "Timestamp", position: "centerBottom", dy: 20}}
                            dataKey="timestamp"
                            padding={{left: left, right: -300}}
                            tick={true}
                            domain={['dataMin', 'dataMax']}
                            tickFormatter = {(unixTime) => moment(unixTime).format('hh:mm')}
                            type = 'number'
                            scale = 'time'
                        />
                        <YAxis
                            type="number"
                            domain={['auto', 'auto']}
                            axisLine={false}
                        />
                        <Tooltip/>
                        <Line type='linear' dataKey='metric' dot={false} stroke='#ff7300' isAnimationActive={animation}
                              animationEasing={'linear'} animationDuration={1000}/>
                    </LineChart>
                </ResponsiveContainer>

            </div>
        );
    }
}

const mapState = (state, ownProps) => {
    const {loading, drone_data, current_data, error} = state.droneData;
    return {loading, drone_data, current_data, error};
};

export default connect(
    mapState
)(ChartView);


// import React from "react";
//

//
//
//
// class ChartView extends React.Component {
//
//     constructor(props) {
//         super(props);
//     }
//
//
//     render() {
//         const {drone_data, error} = this.props;
//
//
//         return (
//             <div style={{ position: 'relative', width: '100%' }}>
//                 <ResponsiveContainer width = '100%' height = {400} >
//                     <LineChart data={drone_data}>
//                         <Line type="normal" dataKey="metric"/>
//                         <CartesianGrid strokeDasharray="1 1" />
//                         <XAxis
//                             dataKey="timestamp"
//                             domain = {['dataMin', 'dataMax']}
//                             name = 'Time'
//                             tickFormatter = {(unixTime) => moment(unixTime).format('HH:mm')}
//                             padding={{left: 0, right: -300}}
//                             type = 'number'
//                         />
//                         <YAxis
//                             type="number" domain={['auto', 'auto']}
//                         />
//                         <Tooltip />
//                         <Legend />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>
//         )
//     }
// }
//
// const mapState = (state, ownProps) => {
//     const {loading, drone_data, current_data, error} = state.droneData;
//     return {loading, drone_data, current_data, error};
// };
//
// export default connect(
//     mapState
// )(ChartView);
