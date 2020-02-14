import {Quaternion, Vector3, Object3D,CylinderBufferGeometry,Mesh,BoxBufferGeometry,MeshPhongMaterial} from 'three'

export default class LSystemBuilder {
    constructor(string, params, position) {
        this.string = string
        this.params = params
        this.position = position
        this.state = {
            radius : this.params.branchRadius,
            length : this.params.branchLength,
            reduction : this.params.branchReduction,
            minRadius : this.params.branchMinRadius,
            position : position ? position : new Vector3( 0, 0, 0 ),
            rotation : new Quaternion()
        }

        this.stateSteps = []
    }

    build() {
        let tree = new Object3D()
        let spawnablePosition = []

        for(let i = 0; i < this.string.length; i++) {
            let currentChar = this.string.charAt(i)

            switch(currentChar) {
                case 'F':
                    tree.add(this.buildBranch())
                    break;
                case 'X':
                    const leave = this.buildLeaves()
                    spawnablePosition.push(leave.spawnablePosition)
                    tree.add(leave.mesh)
                    break;
                case '+':
                    this.state.rotation.multiply( new Quaternion().setFromAxisAngle( new Vector3(0, 0, 1), this.params.angle * Math.PI/180 ) )
                    break;
                case '-':
                    this.state.rotation.multiply( new Quaternion().setFromAxisAngle( new Vector3(0, 0, 1), -this.params.angle * Math.PI/180 ) )
                    break;
                case '&':
                    this.state.rotation.multiply( new Quaternion().setFromAxisAngle( new Vector3(0, 1, 0), -this.params.angle * Math.PI/180 ) )
                    break;
                case '^':
                    this.state.rotation.multiply( new Quaternion().setFromAxisAngle( new Vector3(0, 1, 0), this.params.angle * Math.PI/180 ) )
                    break;
                case '<':
                    this.state.rotation.multiply( new Quaternion().setFromAxisAngle( new Vector3(1, 0, 0), -this.params.angle * Math.PI/180 ) )
                    break;
                case '>':
                    this.state.rotation.multiply( new Quaternion().setFromAxisAngle( new Vector3(1, 0, 0), this.params.angle * Math.PI/180 ) )
                    break;
                case '[':
                    this.stateSteps.push( this.cloneState(this.state) )
                    this.state.radius = (this.state.radius - this.state.reduction) > this.state.minRadius ? (this.state.radius - this.state.reduction) : this.state.radius
                    break;
                case ']':
                    this.state = this.cloneState( this.stateSteps.pop() )
                    break;
                default:
                    break;
            }
        }

        return {
            tree: tree,
            spawnablePositions: spawnablePosition
        }
    }

    buildBranch() {
        let transform = new Quaternion()
        transform.multiply( this.state.rotation )

        let position = new Vector3( 0.0, this.state.length/2, 0.0 )
        position.applyQuaternion( this.state.rotation )
        this.state.position.add( position )

        const geometry = new BoxBufferGeometry( this.state.radius, this.state.length, this.state.radius )
        const material = new MeshPhongMaterial({
            color: 0xab2a20
        }) 
        let mesh = new Mesh( geometry, material )
        mesh.quaternion.copy( this.state.rotation )
        mesh.position.copy( this.state.position )

        this.state.position.add(position)

        return mesh
    }

    buildLeaves() {
        let transform = new Quaternion()
        transform.multiply( this.state.rotation )

        const originalPosition = new Vector3().copy(this.state.position)
        let position = new Vector3( 0, this.state.length/8, 0.0 )
        position.applyQuaternion( this.state.rotation )
        this.state.position.add( position )

        const geometry = new BoxBufferGeometry( this.state.length*2, this.state.length*2, this.state.length*2)
        const material = new MeshPhongMaterial({
            color: 0x32a844
        }) 
        let mesh = new Mesh( geometry, material )
        //mesh.quaternion.copy( this.state.rotation )
        mesh.position.copy( this.state.position )

        this.state.position = new Vector3().copy( originalPosition )

        return {
            mesh: mesh,
            spawnablePosition: {
                type: 'cube',
                size: new Vector3(this.state.length*2, this.state.length*2, this.state.length*2),
                position: mesh.position
            }
        }
    }

    cloneState(state) {
        return {
            radius : state.radius,
            length : state.length,
            reduction : state.reduction,
            minRadius : state.minRadius,
            position : new Vector3().copy(state.position),
            rotation : new Quaternion().copy(state.rotation)
        }
    }
}