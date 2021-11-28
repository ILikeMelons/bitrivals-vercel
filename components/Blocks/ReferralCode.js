import {copy} from '../../utils/clipboard'
import ShareButtons from './ShareButtons'

const ReferralCode = ({userShareCode}) => {
    return (
      <div>
        <div
          className="flex flex-col"
          onClick={() => {
            copy("referralURL");
          }}
        >
          <label className="pt-10 text-gray-300 text-14px">
            Your share URL
          </label>
          <input
            id="referralURL"
            type="text"
            value={"www.bitrivals.gg/?invite=" + userShareCode}
            className={
              "text-center  text-pink bg-transparent cursor-pointer py-2 hidden-cursor"
            }
          />
        </div>
        <div className="flex flex-row justify-around pt-10">
          <ShareButtons shareCode={userShareCode} />
        </div>
      </div>
    );
}

export default ReferralCode;