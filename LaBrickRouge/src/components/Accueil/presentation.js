import image1 from '../../assets/image000001.png';
import image2 from '../../assets/adelaide-et-jean-claude.png';

export default function presentation() {

    return (
        <section className="presentation">
            <div className="container">
                <div className='presentation__section'>
                    <div className='presentation__section_text'>
                        <h1 className="presentation__section_text_title title">Petite presentation</h1>
                        <p className='presentation__section_text_txt'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente non iste molestias eligendi. Officiis consequatur tempora, maiores quaerat veritatis nisi neque maxime aperiam doloribus voluptatem minima blanditiis! Cum, commodi reprehenderit!</p>
                    </div>

                    <div className="presentation__section_image1 image" style={{
                        backgroundImage: `url("${image1}")`
                    }}>
                    </div>
                </div>
                <div className='presentation__section'>

                    <div className="presentation__section_image2 image" style={{
                        backgroundImage: `url("${image2}")`
                    }}>
                    </div>

                    <div className='presentation__section_text'>
                        <h1 className="presentation__section_text_title2 title">La fine équipe</h1>
                        <p className='presentation__section_text_txt'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo omnis velit quasi voluptatibus quas! Nostrum odit voluptas iusto quod ipsa, blanditiis ullam, inventore tempore quam unde sequi quaerat ducimus obcaecati?</p>
                    </div>
                </div>
            </div>
        </section>

    )


}