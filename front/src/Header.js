import imgHeader from './img/FamilyTree_30181.png';

export default function Header () {

  return (
    <div className="header">
      <div className="header-img">
        <img src={imgHeader} alt="tree" width="75" height="75"/>
      </div>
      <div className="header-text">Род — группа людей, возводящих своё происхождение к общему предку-родоначальнику по одной родословной линии</div>
    </div>
  );

}
