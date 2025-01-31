
import Header from '../../components/Header'
import SideNav from '../../components/SideNav'
import Footer from '../../components/Footer'
import CurrenctLocation from '../../components/Location/CurrenctLocation'

function ShellReport() {

    return (
        <div>
            <SideNav />
            <Header />

            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        {/* Small boxes (Stat box) */}

                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="x_content" style={{ marginBottom: 5 }}>
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">BI Spot Details</h3>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                         <CurrenctLocation/>
                                        </div>


                                    </div>
                                </div>



                                
                                {/* /.card */}

                                {/* /.card */}
                            </div>
                            {/* /.col */}
                        </div>



                    </div>{/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div >
            {/* /.content-wrapper */}

            < Footer />
        </div >

    )

}

export default ShellReport


