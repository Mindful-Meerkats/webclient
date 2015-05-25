
var Score = React.createClass({
	render: function(){
		return (
			<div className={"score " + this.props.category }>{ this.props.value }</div>
		)
	}
});

var ScoreWindow = React.createClass({
	render: function(){
		return (
			<div className='scoreWindow'>
				<Score category="welbeing" value="4" />
			</div>
		);
	}
})