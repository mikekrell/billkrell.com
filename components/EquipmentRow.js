
function EquipmentRow( { equip }){
    const getImageUrl = (media) => `${media.fields.file.url}?w=96&fm=png`
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
    return (
        <tr>
            <td>
                {equip.fields.media !== undefined ? <img src={getImageUrl(equip.fields.media[0])} className="image" width="96" height="auto" alt={equip.fields.title}></img> : null}
            </td>
            <td>
                {equip.fields.year}
            </td>
            <td>
                {equip.fields.manufacture}
            </td>
            <td width="20%">
                {equip.fields.title}
            </td>
            <td>
                {equip.fields.type}
            </td>
            <td>
                {formatter.format(equip.fields.weeklyRate)}
            </td>
            <td>
                {formatter.format(equip.fields.monthlyRate)}
            </td>
            <td>
                {equip.fields.price == 0 ? <button className="button is-warning is-small">Call for Quote</button>: <strong>{formatter.format(equip.fields.price)}</strong>}
            </td>
        </tr>
    )
}

export default EquipmentRow
