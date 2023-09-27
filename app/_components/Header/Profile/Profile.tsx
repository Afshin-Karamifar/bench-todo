"use client";
import { IUser } from "@/app/_db/models/User";
import styles from "./../header.module.scss";
import Image from "next/image";
import { useRef, useState } from "react";
import useOutsideClick from "./useOutsideClick";
import SignOutSction from "./SignOutSction";
import { useRouter } from "next/navigation";

export default function Profile({ userInfo }: { userInfo: IUser }) {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const menuRef = useRef(null);
  const router = useRouter();

  useOutsideClick(menuRef, () => setShowProfile(false));

  return (
    <div className={`govuk-grid-column-one-third ${styles.menuItemContainer}`}>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${userInfo.avatar}.png`}
        className={styles.avatar}
        width={50}
        height={50}
        alt={userInfo.userName as string}
        placeholder="empty"
        onClick={() => setShowProfile((prevState) => !prevState)}
      />
      {showProfile && (
        <ul className={styles.profileMenu} ref={menuRef}>
          <li onClick={() => setShowProfile(false)}>{userInfo.userName as string}</li>
          <li
            onClick={async () => {
              setShowProfile(false);
              await SignOutSction();
              router.push("/signin");
            }}
          >
            Sign Out
          </li>
        </ul>
      )}
    </div>
  );
}
